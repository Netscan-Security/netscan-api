import { Host } from '../tables/hosts.interface';

export class HostDto implements Omit<Host, 'id' | 'createdAt' | 'updatedAt'> {
  /**
   * A name for the host
   * @example 'Host1'
   */
  name: string;
  /**
   * The user id of the host, must be uuid of a valid user
   * @example 'user1'
   */
  userId: string;
  /**
   * The room id of the host, must be uuid of a valid room
   * @example 'room1'
   */
  roomId: string;
  /**
   * The cpu of the host
   * @example 'Intel Core i7'
   */
  cpu: string;
  /**
   * The memory of the host
   * @example '16GB'
   */
  memory: string;
  /**
   * The gpu of the host
   * @example 'Nvidia GTX 1060'
   */
  gpu: string;
  /**
   * The hard disk of the host
   * @example '1TB'
   */
  hardDisk: string;
  /**
   * Raw information of the host
   * @example { cpu: 'Intel Core i7', memory: '16GB', gpu: 'Nvidia GTX 1060', hardDisk: '1TB', os: 'Windows 10', model: 'Dell', ipAddress: '23.233.3232.' }
   */
  rawInfo: object;
  /**
   * The os of the host
   * @example 'Windows 10'
   */
  os: string;
  /**
   * The model of the host
   * @example 'Dell'
   */
  model: string;
  /**
   * The ip address of the host
   * @example '23.233.3232.'
   */
  ipAddress: string;
}
