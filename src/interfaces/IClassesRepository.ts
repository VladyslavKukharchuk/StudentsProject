import IClass from './IClass'

export default interface IClassesRepository {
   getClasses(): Promise<IClass[]>;
}