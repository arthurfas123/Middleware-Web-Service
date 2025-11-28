function encriptar(key, msg)
{
    let msg_encriptada = "";
    for(let i = 0; i < msg.length; i++)
    {
        let indice = msg.charCodeAt(i);
        if(indice >= 97 && indice <= 122)
        {
            indice = indice - 97;
            indice = (indice + key) % 27;
            indice += 97;
            msg_encriptada += String.fromCharCode(indice);
        }
        else
        {
            if(indice >= 65 && indice <= 90)
            {
                indice = indice - 65;
                indice = (indice + key) % 27;
                indice += 65;
                msg_encriptada += String.fromCharCode(indice);
            }
            else
            {
                msg_encriptada += String.fromCharCode(indice);
            }
        }
    }
    
    return msg_encriptada;
}

function decriptar(key, msg)
{
    let msg_encriptada = "";
    for(let i = 0; i < msg.length; i++)
    {
        let indice = msg.charCodeAt(i);
        if(indice >= 97 && indice <= 122)
        {
            indice = indice - 97;
            indice = (indice - key) % 27;
            indice += 97;
            msg_encriptada += String.fromCharCode(indice);
        }
        else
        {
            if(indice >= 65 && indice <= 90)
            {
                indice = indice - 65;
                indice = (indice - key) % 27;
                indice += 65;
                msg_encriptada += String.fromCharCode(indice);
            }
            else
            {
                msg_encriptada += String.fromCharCode(indice);
            }
        }
    }
    
    return msg_encriptada;
}

module.exports = {encriptar, decriptar};