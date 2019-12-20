pipeline {
    agent any
    stages {
     stage('Get Into AWS and build') {
            steps {
                sh 'cd;pwd;ls -la .ssh/; less .ssh/y.pub'
                sh 'whoami'
                sh 'ssh ubuntu@13.126.147.254 "cd meetup-live-streaming;sudo docker-compose down --remove-orphans"'
                sh 'ssh ubuntu@13.126.147.254 "cd meetup-live-streaming;  git checkout v1.0.0"'
                sh 'ssh ubuntu@13.126.147.254 "cd meetup-live-streaming;  git pull origin v1.0.0 "'
                sh 'ssh ubuntu@13.126.147.254 "cd meetup-live-streaming; mvn -DskipTests clean compile package "'
                sh 'ssh ubuntu@13.126.147.254 "cd meetup-live-streaming; sudo docker-compose up -d --build"'
            }
        }
    }
}
