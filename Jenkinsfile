pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the version control
                git url: 'https://github.com/deepakswins/node-dev.git', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install Node.js dependencies
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                // Run your tests here, if you have any. If not, you can skip this stage.
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                // Any build steps if needed, for example, bundling your code.
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                // Deploy the application. This could be a custom script or command.
                // If deploying to a server, you might SCP files, run SSH commands, etc.
                // Example of running the Node.js server:
                sh 'nohup node app.js &'
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
