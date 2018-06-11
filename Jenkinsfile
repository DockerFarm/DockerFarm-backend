node {
    try {
        stage('Checkout') {
            checkout scm
        }
        stage('Environment') {
            sh 'git --version'
            echo "Branch: ${env.BRANCH_NAME}"
            sh 'docker -v'
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
                sh 'docker build -t dockerfarm-backend --no-cache .'
                sh 'docker tag dockerfarm-backend localhost:5000/dockerfarm-backend'
                sh 'docker push localhost:5000/dockerfarm-backend'
                sh 'docker rmi -f dockerfarm-backend localhost:5000/dockerfarm-backend'
            }
        }
    } catch (err) {
        throw err
    }
}