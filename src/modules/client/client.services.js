import prisma from "../../../config/db";


export const createClient = async ({ name, email, phone, address, agencyId }) => {
    const existingClient = await prisma.client.findFirst({
        where: {
            email: email || undefined,
            agencyId: agencyId,
        },
    });
    if(existingClient) {
        throw new Error("Client with this email already exists");
    }
    const client = await prisma.client.create({
        data: {
            name,
            email,
            phone,
            address,
            agencyId
        },
        select: {
            id: true,
            name: true,
            company: true,
            phone: true,
            email: true,
            notes: true,
            createdAt: true,
            updatedAt: true,
        }
    });
    return client;
};
export const getClients = async (agencyId) => {
    const clients = await prisma.client.findMany({
        where: {
            agencyId: agencyId,
        },
        orderBy: {
            createdAt: "desc",
        },
        select: {
            id: true,
            name: true,
            company: true,
            phone: true,
            email: true,
            notes: true,
            createdAt: true,
            updatedAt: true,
        }
    });
    return clients;
};

export const getClientById = async (clientId, agencyId) => {
    const client = await prisma.client.findFirst({
        where: {
            id: clientId,
            agencyId: agencyId,
        },
        select: {
            id: true,
            name: true,
            company: true,
            phone: true,
            email: true,
            notes: true,
            createdAt: true,
            updatedAt: true,

            projects: {
                select: {
                    id: true,
                    name: true,
                    status: true,
                    budget: true,
                    startDate: true,
                    endDate: true,
                },
            },
            invoices: {
                select: {
                    id: true,
                    amount: true,
                    status: true,
                    dueDate: true,
                    createdAt: true,
                },
            },
        }
    });
    if (!client) {
        throw new Error("Client not found");
    }
    return client;
};

export const updateClient = async (clientId, agencyId, updateData) => {
    
}
