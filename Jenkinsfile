pipeline {
    agent any
    tools {
        nodejs 'node-18' // Ensure this matches the correct Node.js version in Jenkins tools configuration
    }
    environment {
        DEPLOY_SERVER = '82.112.226.198'  // Server hostname
        DEPLOY_USER = 'root'              // Server's user
        DEPLOY_PATH = '/root/jenkinswork/nextjspipeline'   // Directory on your server
        CREDENTIALS_ID = 'clouldplaysolution'   // Jenkins credentials ID for username-password
    }
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/Santosh31012001/nextjspipeline.git', branch: 'main'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npm run test:ci'
            }
        }
        stage('Deploy to cloudplayserver') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'clouldplaysolution', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                        sh """
                            sshpass -p r#V0C[8NzBLPFiq^NM7Q ssh -o StrictHostKeyChecking=no ${ DEPLOY_USER}@${DEPLOY_SERVER} << EOF
                                # Ensure nvm is sourced to use the correct Node.js version
                                source ~/.bashrc
                                
                                # Navigate to the deployment directory
                                cd ${DEPLOY_PATH}
                                
                                # Pull the latest code
                                git pull origin main
                                
                                # Install dependencies
                                npm install --production
                                
                                # Build the application
                                npm run build
                                
                                # Restart the Next.js application with pm2
                                pm2 restart nextjs-app || pm2 start npm --name "nextjs-app" -- start
                            EOF
                        """
                    }
                }
            }
        }
    }
    post {
        success {
            echo 'Pipeline completed successfully! Application deployed.'
        }
        failure {
            echo 'Pipeline failed. Check the logs for details.'
        }
    }
}
