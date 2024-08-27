pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        PORT = 5000 // Specify the port the server will run on
        SERVER_URL = "http://localhost:${PORT}"
    }

    stages {
        stage('Checkout') {
            steps {
                // Clean up any untracked files from the workspace before checkout
                sh 'git clean -fdx'

                // Checkout the code from the version control
                git url: 'https://github.com/deepakswins/node-dev.git', branch: 'main'
            }
        }

        stage('Display Git Changes') {
            steps {
                script {
                    // Show the last commit hash and the changes made in the last commit
                    def gitCommit = sh(script: "git rev-parse HEAD", returnStdout: true).trim()
                    def gitChanges = sh(script: "git log -1 --pretty=format:'%h - %s (%ci) <%an>' --abbrev-commit", returnStdout: true).trim()
                    def gitDiff = sh(script: "git diff --name-only HEAD~1..HEAD", returnStdout: true).trim()
                    
                    echo "Last Commit: ${gitCommit}"
                    echo "Changes: ${gitChanges}"
                    echo "Files Changed:\n${gitDiff}"
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install Node.js dependencies
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            when {
                expression { return fileExists('package.json') && sh(script: "npm run test -- --help > /dev/null 2>&1", returnStatus: true) == 0 }
            }
            steps {
                // Run tests if they are specified
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                // Any build steps if needed, for example, bundling your code.
                sh 'npm run build || echo "No build script found, skipping build"'
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // If PM2 is being used to manage the Node.js application
                    def isPm2Installed = sh(script: "pm2 -v > /dev/null 2>&1", returnStatus: true) == 0

                    if (isPm2Installed) {
                        // Stop the existing instance, if any
                        sh "pm2 stop nodejs-app || echo 'No existing PM2 process to stop'"
                        // Start or restart the application using PM2
                        sh "pm2 start app.js --name nodejs-app"
                    } else {
                        // Fallback: stop any running node process and start a new one
                        sh 'pkill node || echo "No existing node process to kill"'
                        sh 'nohup node app.js &'
                    }
                }
            }
        }

        stage('Post-Deployment') {
            steps {
                // Print the server URL for easy access
                echo "Application is running at ${env.SERVER_URL}"
            }
        }
    }

    post {
        always {
            // Clean up
            sh 'rm -rf node_modules'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
