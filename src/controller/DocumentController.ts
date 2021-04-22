import { Prisma, PrismaClient } from "../../prisma/client";
import InputJsonValue = Prisma.InputJsonValue;
import InputJsonObject = Prisma.InputJsonObject;

class DocumentController {
    private prisma: PrismaClient<Prisma.PrismaClientOptions, "log" extends keyof Prisma.PrismaClientOptions ? (Prisma.PrismaClientOptions["log"] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<Prisma.PrismaClientOptions["log"]> : never) : never, "rejectOnNotFound" extends keyof Prisma.PrismaClientOptions ? Prisma.PrismaClientOptions["rejectOnNotFound"] : false>;

    constructor(prismaService = new PrismaClient()) {
        this.prisma = prismaService
    }
    async find(documentId: string){
        try{
            const document = await this.prisma.document.findUnique({where:{documentId}})
            if(document) return document
            return await this.prisma.document.create({
                data: {
                    documentId,
                    documentData: ''
                }
            });

        }catch (e) {
            console.log(e)
        }
    }
    async update(documentData: any, documentId: any){
        try {
            await this.prisma.document.update({ where: { documentId }, data: { documentData } });
        }catch (e) {

        }

    }

}
export default new DocumentController()