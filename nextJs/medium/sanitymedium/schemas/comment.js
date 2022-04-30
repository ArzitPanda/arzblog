export default{

    name:'comment',
    title:'Comment',
    type:'document',
    fields: [

            {
                name:"name",
                title:"Name",
                type:"string",
            },
            {

                title:"Approve",
                name:"approve",
                type:"boolean",
                description:"comments won't show without approval"

            },
            {
                name:"email",
                title:"Email",
                type:"string",
            },
            {
                name:"comment",
                title:"Comment",
                type:"string",
            },
            {
                name:"post",
                type:"reference",
                to:[{type:"post"}]
            }


    ]


}