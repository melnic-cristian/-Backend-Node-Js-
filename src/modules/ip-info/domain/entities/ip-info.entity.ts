import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm'; 
import { IpData } from '../models/ip-data';
 
@Entity('ip_info') 
export class IpInfo extends BaseEntity { 
  @PrimaryGeneratedColumn() 
  id: number; 
 
  @Column() 
  ip: string; 
 
  @Column('json') 
  data: IpData;  
 
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) 
  createdAt: Date; 
}