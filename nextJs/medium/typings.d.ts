export interface Post
{


    _id: string;
    _createdAt:string;
    title:string;
    author:{

            name:string;
            image:object;


    };
    mainImage:object;
    description:string;
   
    slug:{
        _type:string;
        current:string;
    };
    body:[object];
}

export interface Comments
{

        _createdAt: string;
        _id:string;
        comment: string;
        email:string;
        name:string;
        post:object;


}
