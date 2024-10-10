<script setup lang="ts">


const api = useRuntimeConfig().public.apiUrl;
const response = ref({id:'',adress:'' ,name: '', dateOfBirth: '', email: '', phoneNumber: '', profilePictureURL: ''});
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


</script>

<template>
  <UIWindowBox :content="{
    name: response.name,
    adress: response.adress,
    dateOfBirth: response.dateOfBirth,
    email: response.email,
    phoneNumber: response.phoneNumber,
    profilePictureUrl: response.profilePictureUrl
  }"></UIWindowBox>
</template>

<style scoped>

</style>