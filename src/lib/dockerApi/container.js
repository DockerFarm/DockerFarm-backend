import axios from 'axios';
import nvl from 'nvl';

/**
 * Container Process List All  
 * @param {String} url 
 */
export const getContainerList = 
    (url) => 
        axios.get(`${url}/containers/json`)
            .then(resp => {
                return resp.data.map( v => (
                    {
                        id: v.Id.substring(0,12),
                        name: v.Names[0].slice(1),
                        state: v.State,
                        image: v.Image,
                        status: v.Status,
                        command: v.Command,
                        ip: v.NetworkSettings.Networks.bridge.IPAddress ,
                        port: v.Ports.map( v => (
                            { 
                                private: nvl(v.PrivatePort,''), 
                                public: nvl(v.PublicPort,''), 
                                type: v.Type
                            }
                        )
                    )
                    }
                ))    
            });

/**
 * Container Inspect Raw Data 
 * @param {String} url
 * @param {String} id 
 */
export const getContainerInspectRaw = ({url, id}) => axios.get(`${url}/containers/${id}/json`);

/**
 * Container Inspect Process Data 
 * @param {String} url
 * @param {String} id 
 */
export const getContainerInfo = ({url, id}) => axios.get(`${url}/containers/${id}/json`);
export const startContainer = ({url, id}) => axios.post(`${url}/containers/${id}/start`); 
export const stopContainer = ({url, id}) => axios.post(`${url}/containers/${id}/stop`);
export const restartContainer = ({url, id}) => axios.post(`${url}/containers/${id}/restart`);
export const killContainer = ({url, id}) => axios.post(`${url}/containers/${id}/kill`);