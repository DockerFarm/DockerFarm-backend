import * as ServiceApi from 'lib/dockerApi/service';
import { get, assign, reduce, map, concat, uniqBy } from 'lodash';

export const prepareFormData = (config) => {
    //prepare placement
	const constraint = get(config, 'placementConstraints',[]);
    const placement = {};
    const prepareConstraint = constraint.map(v => {
		return v.name + v.condition + v.value;
	});
    const preference = get(config, 'placementPreferences', []);
    const preparePreference = preference.map(v => {
        const value = {}
        if(v.startegy == "spread") {
            value.Spread = {SpreadDescriptor: v.value}
            return value;
        }
        return;
    });
    placement.Constraints = prepareConstraint;
    placement.Preferences = preparePreference;

    //prepare scheduling mode
    const scheduling = get(config, 'schedulingMode', []);
    const mode = scheduling.reduce((acc, v) => {
        if (v.mode == 'replicated') {
            acc["Replicated"] = {"Replicas": v.replicas}
            return acc;
        } else if (v.mode == 'global') {
            acc["Global"] = {};
            return acc;
        }
    }, {});

    //prepare networks
    const network = [{"network" : get(config, 'network', '')}];
    const extraNetwork = get(config, 'extraNetwork', []);
    const prepareNetwork = concat(network, extraNetwork).map(v => {
        const value = {};
        value.Target = v.network;
        return value;
    });
    const networks = uniqBy(prepareNetwork, 'Target');

    return { placement, mode, networks };
}



export const getServiceList = async ctx => {
    const { endpoint: { url } } = ctx.state.user;
    try {
        const  data = await ServiceApi.getServiceList(url);
        ctx.status = 200;
        ctx.body = { result: data };
    } catch(e) {
        ctx.throw(e, 500);
    }
}

export const getServiceInfo = async ctx => {
    const { endpoint: {url} } = ctx.state.user;
    const { id } = ctx.params;

    try {
        const data = await ServiceApi.getServiceInfo({url, id});
        ctx.status = 200;
        ctx.body = { result: data };
    } catch(e) {
        ctx.throw(e, 500);
    }
}

export const createService = async ctx => {
    const { endpoint: {url} } = ctx.state.user;
    const form = ctx.request.body;
    assign(form, prepareFormData(form));

    try {
        const { data } = await ServiceApi.createService({url, form});
        ctx.status = 200;
        ctx.body = { result: data };
    } catch(e) {
        console.log(e)
        ctx.throw(e, 500);
    }
}

export const getServiceLog = async ctx => {
    const { endpoint: { url } } = ctx.state.user;
    const { id } = ctx.params;

	try {
		const data = await ServiceApi.getServiceLog({
			url,
			id,
			query: ctx.request.query
		});

        ctx.status = 200;
        ctx.body = { result: data };
	} catch(e) {
        ctx.throw(e, 500);
	}
}

export const deleteService = async ctx => {
    const { endpoint: {url} } = ctx.state.user;
    const { id } = ctx.params;

    try {
        const { data } = await ServiceApi.deleteService({url, id});
        ctx.status = 200;
        ctx.body = { result: data };
    } catch(e) {
        ctx.throw(e, 500);
    }
}
