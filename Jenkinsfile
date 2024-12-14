pipeline {
    agent any
    tools {
        nodejs 'node-18'
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
                sh 'npm run test'  // Runs tests
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npm run test:ci'  // Runs tests optimized for CI/CD
            }
        }
    }
    post {
        success {
            echo 'Tests passed successfully!'
        }
        failure {
            echo 'Tests failed. Check the logs for details.'
        }
    }
}
