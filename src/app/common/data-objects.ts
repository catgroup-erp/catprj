export class APIResponse {

    constructor(
        public status: number,
        public message: string,
        public data?: any
    ) { }
}

export class Status {

    public st: { code: string, desc: string }[];
    
    constructor() {
        this.st = [
            { code: 'I', desc: 'Interim' },
            { code: 'F', desc: 'Final' },
            { code: 'N', desc: 'Not Invoiced' }
        ];
    }
}

export class PRJPOH {
    OH_AREA: string;
    OH_PROJID: number;
    OH_POUID: string;
    OH_PLAN: number;
    OH_TYPE: string;
    OH_STATUS: string;
    OH_REF: string;
    OH_PERIOD: string;
    OH_LAYOUT: number;
    OH_DESC: string;
    OH_INVDATE: string;
    OH_PODATE: string;
}


export class Area {
    AR_ELOC: string;
    AR_AREA: string;
    AR_COUNTRY: string;
    AR_DESC: string;
    AR_DESCA: string;
    AR_DESCO: string;
    AR_OLDREF: string;
    AR_CRUSER: string;
    AR_CRDATE: Date;
    AR_MDUSER: string;
    AR_MDDATE: Date;
    AR_WEEKSTART: string;
}

export class Project {

    PR_PROJID: number;
    PR_DESC: string;
}

export class WBS {
    WB_WBS: number;
    WB_WBSDESC: string;
}

export class PRJPLANH {
    PH_PLAN: number;
    PH_DESC: string;
}

export class PRJPOLAYOUT {
    PL_LAYOUT: number;
    PL_COL: number;
    PL_DESC: string;
}
