<script setup lang="ts">

interface flexworkerContent {
  id: string,
  name: string,
  adress: string,
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  profilePictureUrl: string;
}

const api = useRuntimeConfig().public.apiUrl;
const response = ref<flexworkerContent>({id:'',adress:'' ,name: '', dateOfBirth: '', email: '', phoneNumber: '', profilePictureURL: ''});
const error = ref(null);

// get id from query params
const router = useRouter();
const id = router.currentRoute.value.query.id;



onMounted(async () => {
  try {
    const res = await fetch(`${api}/Flexworker/GetById?id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    response.value = data;

    //update url
    router.push({path: '/flexworker/' + data.name , query:{id}});

  } catch (err:any) {
    error.value = err.message;
    console.error('Fetch error:', err);
  }
});

async function handleUpdate(payload:object) {
  const content = ref<flexworkerContent>({
    id: id,
    name: payload.name,
    adress: payload.adress,
    dateOfBirth: payload.dateOfBirth,
    email: payload.email,
    phoneNumber: payload.phoneNumber,
    profilePictureUrl: payload.profilePictureUrl
  })
  
  console.log("content check");
  console.log(content);
  try {
    const res = await fetch(`${api}/Flexworker/Update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(content.value)
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  } catch (err:any) {
    error.value = err.message;
    console.error('Fetch error:', err);
  }
}


</script>

<template>
  <UIWindowBox :content="{
    name: response.name,
    adress: response.adress,
    dateOfBirth: response.dateOfBirth,
    email: response.email,
    phoneNumber: response.phoneNumber,
    profilePictureUrl: response.profilePictureUrl
  }"
  @updateEvent="handleUpdate"
  ></UIWindowBox>
</template>

<style scoped>

</style>