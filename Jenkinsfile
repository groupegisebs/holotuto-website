// ==============================================================================
// Pipeline CI/CD — HoloTuto Homepage
// Repo    : https://github.com/negspace2001/holotuto-website
// Domain  : https://holotuto.com
// Registry: ghcr.io/negspace2001
//
// Stages : Checkout → Install → Audit → Build JS → Docker Build →
//          Docker Test → Docker Push → Deploy → Notify
// ==============================================================================
pipeline {
    agent any

    // -------------------------------------------------------------------------
    // Variables globales (valeurs fixes — pas de credentials() ici)
    // -------------------------------------------------------------------------
    environment {
        // GitHub Container Registry
        REGISTRY      = 'ghcr.io/negspace2001'
        REGISTRY_HOST = 'ghcr.io'
        IMAGE_NAME    = 'holotuto-website'
        GITHUB_REPO   = 'negspace2001/holotuto-website'

        // Répertoire de déploiement sur holotuto.com
        DEPLOY_DIR    = '/opt/holotuto'
        // Port exposé sur l'hôte de production (un reverse proxy gère le TLS 443→80)
        HOST_PORT     = '80'

        // IDs des credentials Jenkins (chaînes littérales requises)
        GHCR_CREDS       = 'GHCR_TOKEN'          // Username + PAT GitHub (scope: write:packages)
        DEPLOY_SSH_CREDS = 'HOLOTUTO_DEPLOY_KEY'  // Clé SSH privée (type: SSH Username with private key)
        DEPLOY_HOST_CRED = 'HOLOTUTO_DEPLOY_HOST' // Secret text: deploy_user@holotuto.com
        NOTIFY_EMAIL     = 'nguimbouseffa@yahoo.fr'
    }

    // -------------------------------------------------------------------------
    // Paramètres (modifiables via "Build with Parameters" dans Jenkins)
    // -------------------------------------------------------------------------
    parameters {
        booleanParam(
            name:         'SKIP_AUDIT',
            defaultValue: false,
            description:  'Ignorer npm audit (urgences uniquement)')
        booleanParam(
            name:         'PUSH_IMAGE',
            defaultValue: true,
            description:  'Pousser l\'image vers ghcr.io/negspace2001')
        booleanParam(
            name:         'DEPLOY',
            defaultValue: true,
            description:  'Déployer sur holotuto.com après push réussi')
        string(
            name:         'BRANCH_OVERRIDE',
            defaultValue: '',
            description:  'Forcer une branche (laisser vide pour utiliser la branche du SCM)')
    }

    // -------------------------------------------------------------------------
    // Options du pipeline
    // -------------------------------------------------------------------------
    options {
        buildDiscarder(logRotator(numToKeepStr: '10', artifactNumToKeepStr: '5'))
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
        timestamps()
        // Colorer les logs dans la console Jenkins
        ansiColor('xterm')
    }

    // -------------------------------------------------------------------------
    // Déclencheurs
    // -------------------------------------------------------------------------
    triggers {
        // Déclenché par webhook GitHub (configurer dans le repo negspace2001/holotuto-website)
        githubPush()
        // Rebuild nocturne pour détecter de nouvelles vulnérabilités (npm audit)
        cron('H 3 * * *')
    }

    // ===========================================================================
    // STAGES
    // ===========================================================================
    stages {

        // -----------------------------------------------------------------------
        // 1. Checkout
        // -----------------------------------------------------------------------
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: params.BRANCH_OVERRIDE ?: '*/main']],
                    userRemoteConfigs: [[
                        url: "https://github.com/${GITHUB_REPO}.git",
                        credentialsId: GHCR_CREDS
                    ]]
                ])
                script {
                    env.GIT_COMMIT_SHORT = sh(
                        script: 'git rev-parse --short HEAD',
                        returnStdout: true
                    ).trim()
                    env.GIT_BRANCH_NAME = params.BRANCH_OVERRIDE ?:
                        (env.BRANCH_NAME ?: sh(
                            script: 'git rev-parse --abbrev-ref HEAD',
                            returnStdout: true
                        ).trim())

                    // Tag image : branch-shortSHA (ex: main-a1b2c3d)
                    // Les slashes dans les noms de branch sont remplacés par des tirets
                    env.IMAGE_TAG = "${env.GIT_BRANCH_NAME}-${env.GIT_COMMIT_SHORT}"
                                        .replaceAll('/', '-')

                    // Full tag GHCR
                    env.FULL_TAG        = "${REGISTRY}/${IMAGE_NAME}:${env.IMAGE_TAG}"
                    env.FULL_TAG_LATEST = "${REGISTRY}/${IMAGE_NAME}:latest"

                    // Indicateur main/master pour le push "latest" et le déploiement
                    env.IS_MAIN = (env.GIT_BRANCH_NAME ==~ /^(main|master)$/) ? 'true' : 'false'

                    echo "Repo   : ${GITHUB_REPO}"
                    echo "Branch : ${env.GIT_BRANCH_NAME} (main=${env.IS_MAIN})"
                    echo "Commit : ${env.GIT_COMMIT_SHORT}"
                    echo "Tag    : ${env.IMAGE_TAG}"
                }
            }
        }

        // -----------------------------------------------------------------------
        // 2. Install
        // -----------------------------------------------------------------------
        stage('Install') {
            steps {
                sh '''
                    echo "=== Environnement Node ==="
                    node --version
                    npm --version
                    echo "=== Installation des dépendances ==="
                    npm ci --ignore-scripts
                '''
            }
        }

        // -----------------------------------------------------------------------
        // 3. Tests unitaires et d'intégration (Vitest)
        // -----------------------------------------------------------------------
        stage('Test') {
            steps {
                sh '''
                    echo "=== Tests unitaires et d\'intégration (Vitest) ==="
                    npm test
                    echo "Tests terminés."
                '''
            }
        }

        // -----------------------------------------------------------------------
        // 4. Audit sécurité npm
        // -----------------------------------------------------------------------
        stage('Security Audit') {
            when {
                expression { !params.SKIP_AUDIT }
            }
            steps {
                sh '''
                    echo "=== Audit sécurité npm ==="
                    # Rapport lisible (ne bloque pas le build — le JSON sera archivé)
                    npm audit --audit-level=high || true
                    # Rapport machine pour archivage
                    npm audit --json > npm-audit.json || true
                    echo "Audit terminé."
                '''
            }
            post {
                always {
                    archiveArtifacts artifacts: 'npm-audit.json', allowEmptyArchive: true
                }
            }
        }

        // -----------------------------------------------------------------------
        // 5. Build JS (Vite)
        // -----------------------------------------------------------------------
        stage('Build JS') {
            steps {
                sh '''
                    echo "=== Build Vite ==="
                    npm run build
                    echo "=== Vérification du résultat ==="
                    test -f dist/index.html || (echo "ERREUR: dist/index.html absent" && exit 1)
                    ls -lh dist/assets/
                    du -sh dist/
                '''
            }
            post {
                success {
                    archiveArtifacts artifacts: 'dist/**', allowEmptyArchive: false
                }
            }
        }

        // -----------------------------------------------------------------------
        // 6. Build image Docker
        // -----------------------------------------------------------------------
        stage('Docker Build') {
            steps {
                sh """
                    echo "=== Docker Build : ${env.FULL_TAG} ==="
                    docker build \\
                        --label "org.opencontainers.image.revision=${env.GIT_COMMIT_SHORT}" \\
                        --label "org.opencontainers.image.ref.name=${env.GIT_BRANCH_NAME}" \\
                        --label "org.opencontainers.image.created=\$(date -u +%Y-%m-%dT%H:%M:%SZ)" \\
                        --label "com.holotuto.build.number=${env.BUILD_NUMBER}" \\
                        --label "com.holotuto.build.url=${env.BUILD_URL}" \\
                        -t ${env.FULL_TAG} \\
                        .
                    echo "=== Image construite avec succès ==="
                    docker image inspect ${env.FULL_TAG} --format '{{.Id}} ({{.Size}} bytes)'
                """
            }
        }

        // -----------------------------------------------------------------------
        // 7. Tests de l'image Docker
        //    Lance un conteneur temporaire sur le port 18080 et effectue
        //    des vérifications fonctionnelles complètes.
        // -----------------------------------------------------------------------
        stage('Docker Test') {
            steps {
                script {
                    def testPort = 18080

                    // Stopper un éventuel conteneur de test orphelin
                    sh "docker rm -f holotuto-test 2>/dev/null || true"

                    // Démarrer le conteneur de test (nommé pour pouvoir le stopper proprement)
                    sh "docker run -d --name holotuto-test -p ${testPort}:8080 ${env.FULL_TAG}"

                    // Attendre que nginx soit prêt (max 20 s)
                    sh """
                        echo "=== Attente du démarrage nginx ==="
                        for i in \$(seq 1 20); do
                            if curl -sf http://localhost:${testPort}/healthz > /dev/null 2>&1; then
                                echo "nginx prêt après \${i}s"
                                break
                            fi
                            [ \$i -eq 20 ] && echo "TIMEOUT: nginx n'a pas répondu" && exit 1
                            sleep 1
                        done
                    """

                    // Suite de tests fonctionnels
                    sh """
                        set -e
                        TEST_URL="http://localhost:${testPort}"
                        PASS=0
                        FAIL=0

                        run_test() {
                            local name="\$1"
                            local cmd="\$2"
                            if eval "\$cmd" > /dev/null 2>&1; then
                                echo "[PASS] \$name"
                                PASS=\$((PASS+1))
                            else
                                echo "[FAIL] \$name"
                                FAIL=\$((FAIL+1))
                            fi
                        }

                        # Test 1 : Healthcheck endpoint
                        run_test "GET /healthz retourne 'ok'" \\
                            "curl -sf \$TEST_URL/healthz | grep -q 'ok'"

                        # Test 2 : index.html servi
                        run_test "GET / retourne <!DOCTYPE html>" \\
                            "curl -sf \$TEST_URL/ | grep -qi '<!DOCTYPE html>'"

                        # Test 3 : SPA fallback — route inconnue → 200 (pas 404)
                        run_test "SPA fallback /route-inexistante → HTTP 200" \\
                            "[ \"\$(curl -so /dev/null -w '%{http_code}' \$TEST_URL/route-inexistante)\" = '200' ]"

                        # Test 4 : Redirect www → non-www
                        # (nécessite que l'hôte soit dans /etc/hosts ou test via Host header)
                        run_test "Header X-Frame-Options: SAMEORIGIN présent" \\
                            "curl -sI \$TEST_URL/ | grep -qi 'X-Frame-Options: SAMEORIGIN'"

                        # Test 5 : En-tête X-Content-Type-Options
                        run_test "Header X-Content-Type-Options: nosniff présent" \\
                            "curl -sI \$TEST_URL/ | grep -qi 'X-Content-Type-Options: nosniff'"

                        # Test 6 : En-tête Referrer-Policy
                        run_test "Header Referrer-Policy présent" \\
                            "curl -sI \$TEST_URL/ | grep -qi 'Referrer-Policy'"

                        # Test 7 : Cache immutable sur les assets Vite (grep -E, pas -P)
                        JS_PATH=\$(curl -sf \$TEST_URL/ | grep -oE '/assets/[^"]+\\.js' | head -1)
                        JS_FILE=\$(echo "\$JS_PATH" | sed 's|/assets/||')
                        if [ -n "\$JS_FILE" ]; then
                            run_test "Cache-Control: immutable sur /assets/\$JS_FILE" \\
                                "curl -sI \$TEST_URL/assets/\$JS_FILE | grep -qi 'immutable'"
                        else
                            echo "[SKIP] Aucun asset JS trouvé dans index.html"
                        fi

                        # Test 8 : Fichiers cachés bloqués
                        run_test "GET /.env bloqué (403 ou 404)" \\
                            "[ \"\$(curl -so /dev/null -w '%{http_code}' \$TEST_URL/.env)\" != '200' ]"

                        # Test 9 : Gzip actif
                        run_test "Gzip activé sur text/html" \\
                            "curl -sI --compressed \$TEST_URL/ | grep -qi 'content-encoding: gzip'"

                        echo ""
                        echo "=== Résultats : \$PASS tests PASS, \$FAIL tests FAIL ==="
                        [ \$FAIL -eq 0 ] || exit 1
                    """
                }
            }
            post {
                always {
                    sh "docker rm -f holotuto-test 2>/dev/null || true"
                }
            }
        }

        // -----------------------------------------------------------------------
        // 8. Push vers ghcr.io/negspace2001
        //    Uniquement si PUSH_IMAGE=true
        // -----------------------------------------------------------------------
        stage('Docker Push') {
            when {
                expression { params.PUSH_IMAGE }
            }
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'GHCR_TOKEN',
                    usernameVariable: 'GHCR_USER',
                    passwordVariable: 'GHCR_PASS'
                )]) {
                    sh '''
                        echo "=== Connexion à ghcr.io ==="
                        echo "$GHCR_PASS" | docker login ghcr.io -u "$GHCR_USER" --password-stdin
                    '''
                    sh "docker push ${env.FULL_TAG}"
                    echo "Pushed: ${env.FULL_TAG}"

                    // Sur main/master : taguer aussi "latest"
                    script {
                        if (env.IS_MAIN == 'true') {
                            sh "docker tag ${env.FULL_TAG} ${env.FULL_TAG_LATEST}"
                            sh "docker push ${env.FULL_TAG_LATEST}"
                            echo "Pushed: ${env.FULL_TAG_LATEST}"
                        }
                    }
                }
            }
            post {
                always {
                    // Déconnexion sécurisée (hôte seul, pas le namespace)
                    sh 'docker logout ghcr.io || true'
                }
            }
        }

        // -----------------------------------------------------------------------
        // 9. Déploiement sur holotuto.com (SSH)
        //    Uniquement sur main/master après push réussi
        // -----------------------------------------------------------------------
        stage('Deploy') {
            when {
                allOf {
                    expression { params.DEPLOY }
                    expression { params.PUSH_IMAGE }
                    expression { env.IS_MAIN == 'true' }
                }
            }
            steps {
                withCredentials([string(
                    credentialsId: 'HOLOTUTO_DEPLOY_HOST',
                    variable: 'DEPLOY_HOST_STR'
                )]) {
                    sshagent(credentials: ['HOLOTUTO_DEPLOY_KEY']) {
                        // Passer les variables Jenkins comme arguments explicites à la commande SSH
                        // afin d'éviter les problèmes d'interpolation dans les heredocs
                        sh """
                            ssh -o StrictHostKeyChecking=no -o BatchMode=yes \${DEPLOY_HOST_STR} \\
                                "set -euo pipefail
                                 echo '=== Déploiement holotuto.com ==='
                                 cd ${DEPLOY_DIR}

                                 echo 'Pull image: ${env.FULL_TAG}'
                                 docker pull ${env.FULL_TAG}

                                 echo 'Démarrage docker compose...'
                                 IMAGE_TAG=${env.IMAGE_TAG} HOST_PORT=${HOST_PORT} \\
                                     docker compose up -d --remove-orphans

                                 echo 'Vérification santé du conteneur...'
                                 for i in \\\$(seq 1 30); do
                                     STATUS=\\\$(docker inspect --format='{{.State.Health.Status}}' holotuto 2>/dev/null || echo 'starting')
                                     if [ \\\"\\\$STATUS\\\" = 'healthy' ]; then
                                         echo \\\"Conteneur healthy après \\\${i}x2s\\\"
                                         break
                                     fi
                                     [ \\\$i -eq 30 ] && echo 'TIMEOUT: conteneur jamais healthy' && exit 1
                                     sleep 2
                                 done

                                 echo 'Nettoyage des images obsolètes...'
                                 docker image prune -f --filter 'label=com.holotuto.app=holotuto-website' || true
                                 echo '=== Déploiement terminé ==='"
                        """
                    }
                }
            }
        }
    }

    // ===========================================================================
    // POST-ACTIONS GLOBALES
    // ===========================================================================
    post {
        success {
            script {
                def msg = """Pipeline CI/CD réussi — HoloTuto Homepage

Branch  : ${env.GIT_BRANCH_NAME ?: 'N/A'}
Commit  : ${env.GIT_COMMIT_SHORT ?: 'N/A'}
Image   : ${env.FULL_TAG ?: 'N/A'}
Build   : ${env.BUILD_URL}
Site    : https://holotuto.com
"""
                echo msg
                emailext(
                    to:       env.NOTIFY_EMAIL,
                    subject:  "[HOLOTUTO] Build #${env.BUILD_NUMBER} ✔ SUCCESS — ${env.GIT_BRANCH_NAME}",
                    body:     msg,
                    mimeType: 'text/plain'
                )
            }
        }

        failure {
            script {
                def msg = """Pipeline CI/CD en ÉCHEC — HoloTuto Homepage

Branch  : ${env.GIT_BRANCH_NAME ?: 'N/A'}
Commit  : ${env.GIT_COMMIT_SHORT ?: 'N/A'}
Build   : ${env.BUILD_URL}
Logs    : ${env.BUILD_URL}console
"""
                echo msg
                emailext(
                    to:       env.NOTIFY_EMAIL,
                    subject:  "[HOLOTUTO] Build #${env.BUILD_NUMBER} ✖ FAILURE — ${env.GIT_BRANCH_NAME}",
                    body:     msg,
                    mimeType: 'text/plain'
                )
                // Déconnexion sécurité en cas de crash pendant le push
                sh 'docker logout ghcr.io 2>/dev/null || true'
            }
        }

        always {
            script {
                // Nettoyer l'image locale pour éviter l'accumulation sur l'agent Jenkins
                if (env.FULL_TAG) {
                    sh "docker rmi ${env.FULL_TAG} ${env.FULL_TAG_LATEST} 2>/dev/null || true"
                }
            }
            cleanWs()
        }
    }
}
