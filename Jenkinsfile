pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                script {
                    echo 'Installing dependencies...'
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    echo 'Building the project...'
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    echo 'Deploying the application...'
                    sh '''
                        # Stop the current running application (if any)
                        pm2 stop all || true
                        
                        # Start the application with pm2 using main.js
                        pm2 start main.js --name "your-app-name"
                        
                        # Save the pm2 process list and corresponding environments
                        pm2 save
                    '''
                }
            }
        }
    }

    post {
        always {
            script {
                echo 'Cleaning up workspace...'
                cleanWs()
            }
        }
    }
}
