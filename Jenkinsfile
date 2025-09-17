pipeline {
    agent any

    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'main',
                    credentialsId: 'vishva-vsr',
                    url: 'https://github.com/vishva-vsr/Employee_salary.git'
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                sh 'docker build -t flask-backend ./backend'
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                sh 'docker build -t react-frontend ./frontend'
            }
        }

        stage('Run Containers') {
            steps {
                sh '''
                docker rm -f flask-backend || true
                docker rm -f react-frontend || true
                docker run -d -p 5000:5000 --name flask-backend flask-backend
                docker run -d -p 3000:3000 --name react-frontend react-frontend
                '''
            }
        }
    }
}
