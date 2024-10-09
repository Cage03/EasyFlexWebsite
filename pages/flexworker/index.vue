<script setup lang="ts">


const api = useRuntimeConfig().public.apiUrl;
//const response = ref({ name: '', dateOfBirth: '', email: '', phoneNumber: ''});
const response = ref({
  name:{
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  }
})
const error = ref(null);

// get id from query params
const router = useRouter();
const id = router.currentRoute.value.query.id;

onMounted(async () => {
  try {
    const res = await fetch(`${api}/GetById?id=${id}`, {
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
    console.log(response);
  } catch (err:any) {
    error.value = err.message;
    console.error('Fetch error:', err);
  }
});
</script>

<template>
  <UIWindowBox :content="{name:response.name, dateOfBirth: response.dateOfBirth, email: response.email, phoneNumber: response.phoneNumber	}"></UIWindowBox>
</template>

<style scoped>

</style>