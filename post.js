 const apiUrl ='https://jsonplaceholder.typicode.com';
 
 
 async function fetchPosts() {
   try{
      const response = await fetch(`${apiUrl}/posts`);

      if(!response.ok){
        throw new Error(`Failed to fetch posts: ${response.status}`)
      }

      return await response.json();
  }   catch (e){
      console.log(e);
  }
}

function listsPosts(postContainerElementId){ //listing the element
  const  postContainerElement = document.getElementById
  (postContainerElementId);

  if (!postContainerElement){
    return;
  }

   fetchPosts()
   .then((posts) => {
     if(!posts){
       postContainerElement.innerHTML = 'No posts fetched';
      return;     
    }

    for(const post of posts){//walking through the post array
        postContainerElement.appendChild(postElement(post));
      }
   })
   .catch((e) => {
      console.log(e);
   });
}

function postElement(post){ //function for creating element
  const anchorElement = document.createElement('a');//doing additional dom manipulation
  anchorElement.setAttribute('href',`${apiUrl}/posts/${post.id}`);//creating the link.
  anchorElement.setAttribute('target','_blank');
  anchorElement.innerText = capitalizeFirstLetter(post.title);//displaying post title inside the link

  const postTitleElement = document.createElement('h3');
  postTitleElement.appendChild(anchorElement);//inserting anchor element into postTitleElement

  return postTitleElement
}

function capitalizeFirstLetter(str){ //to make the first letter capital
  return str.charAt(0).toUpperCase() + str.slice(1);
}