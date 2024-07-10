const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
    const createdUsers = await prisma.user.create({
        data: {
            username: 'Bob',
            email: 'bob@example.com',
            profile: {
                create: {
                    bio: 'I am learning'
                }
            }
        }, 
        
        include: {
            profile: true
        }
    })

    console.log(`${createdUsers.username} users created`, createdUsers)

    const userPosts = await prisma.post.createMany({
        data: [ 
            {
              title: 'My Title', 
              content: 'I said this ...',  
              userId: createdUsers.id
            }, 
            {
                title: 'Boolean', 
                content: 'The great halo ...', 
                userId: createdUsers.id
              }, 
              {
                title: 'Post me', 
                content: 'Whats the great ...',
                userId: createdUsers.id
              }
        ]
    })
            
    console.log(`${userPosts.count} post created`, userPosts  )

    const userComments = await prisma.comment.createMany({
        data: [
            {
                content:  'creating comments ...',
                userId: createdUsers.id
            },

            {
                content: 'Boolean is the best ...',
                userId: createdUsers.id
            }, 

            {
                content: 'Way loading .. ...',
                userId: createdUsers.id
            }
          
        ]
    })

    console.log(`${userComments.count} comment created`, userComments)

    // Don't edit any of the  code below this line
    process.exit(0);
}

seed()
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    })