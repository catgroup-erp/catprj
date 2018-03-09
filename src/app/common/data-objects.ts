export class APIResponse {

    constructor(
        public status: number,
        public message: string,
        public data?: string
    ) { }
}

export class SelectItem {

    constructor(public value: string, public label: string) { }
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
