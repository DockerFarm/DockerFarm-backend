import tcpp from 'tcp-ping';

export default (host, port) =>
    new Promise((resolve,reject) => {
        tcpp.probe(host, port, (err, available) => {

            if(available){
                resolve();
            } else {
                reject();
            }

        });
    });