node {
    try {
        stage('Checkout') {
            checkout scm
        }
        stage('Environment') {
            sh 'git --version'
            echo "Branch: ${env.BRANCH_NAME}"
            sh 'sudo docker -v'
            sh 'printenv'
        }
        stage('Build Docker test') {
            echo "Build Docker Test" 
        } 
        stage('Docker test') {
            echo "Dokcer test" 
        }
        stage('Clean Docker test'){
            echo "Clean Docker test"
        }
        stage('Deploy') {
            if(env.BRANCH_NAME == 'master') {
                sh 'sudo docker build -t dockerfarm-backend --no-cache .'
                sh 'sudo docker tag dockerfarm-backend localhost:5000/dockerfarm-backend'
                sh 'sudo docker push localhost:5000/dockerfarm-backend'
                sh 'sudo docker rmi -f dockerfarm-backend localhost:5000/dockerfarm-backend'
            }
        }
    } catch (err) {
        throw err
    }
}