import axios from 'axios';
const ctrl = {};

ctrl.list =  async ({ body }, res) => {
    try{
        const response = await axios.get('http://711bbc4d.ngrok.io/containers/json');
        
        if( response.status == 200 ) {
            res.status(200).send(response.data);
        } else {
            res.status(500).send(response.data);
        }
    } catch ( e ) {
        res.status(500);
    }
};

ctrl.stop = async({ body }, res) => {
    try{
        const response = await axios.get('http://711bbc4d.ngrok.io/containers')
    } catch ( e ) {
        res.status(500);
    }
};


ctrl.start = async({ body}, res ) => {
    try {
        const response = await axios.get(`http://711bbc4d.ngrok.io/container/${body.id}/stop`);

        if( response.status == 200 ) {
            res.status(200).send(response.data);
        } else {
            res.status(500).send(response.data);
        }

    } catch ( e ) {
        res.status(500);
    }
}

export default ctrl;
