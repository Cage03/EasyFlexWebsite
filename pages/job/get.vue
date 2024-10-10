<script setup lang="ts">

const api = useRuntimeConfig().public.apiUrl;

const job = ref({ name: '', address: '', description: '', minHours: '', maxHours: '', startDate: '', endDate: '' })
const error = ref(null);

const router = useRouter();
const id = router.currentRoute.value.query.id;

onMounted(async () => {
  try {
    const res = await fetch(`${api}/Job/Get?id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    job.value = data;
 
    //update url
    router.push({path: '/Job/' + data.name , query:{id}});
 
  } catch (err:any) {
    error.value = err.message;
    console.error('Fetch error:', err);
  }
});

</script>

<template>
    
</template>
