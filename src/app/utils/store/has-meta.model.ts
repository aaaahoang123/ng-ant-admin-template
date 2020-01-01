export interface MetaDataDescription {
  classNames?: string;
  clickable?: boolean;
  styles?: string;
  propsType?: string;
  requesting?: boolean;
}

export declare type HasMetaModel<T> = T & MetaDataDescription;
