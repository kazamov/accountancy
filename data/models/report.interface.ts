import { IGroup, IPreparedGroup } from './group.interface';

export interface IReport {
	groups: IGroup[];
	total: number;
}

export interface IPreparedReport {
	groups: IPreparedGroup[];
	total: number;
}
