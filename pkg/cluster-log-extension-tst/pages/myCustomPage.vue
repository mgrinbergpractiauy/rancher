<template>
  <div class="p-20"> <h3 class="mb-20">
        <span class="text-xl font-bold">POC RANCHER EXTENSION CUSTOM</span>
    </h3>
    <h3 class="mb-20">
        <span class="text-xl font-bold">Cluster Info</span>
    </h3>

    <div class="mb-10">
      <label class="text-label">Cluster ID:</label>
      <div class="text-lg font-mono">{{ clusterId }}</div>
    </div>
    
    <h4 class="mb-10 mt-20">Pods disponibles</h4>
    <ul class="list-disc pl-20">
      <li v-for="p in pods" :key="p.id" class="text-sm">
        {{ p.metadata.name }}
      </li>
    </ul>

    <hr class="mt-20 mb-20"> <h4 class="mb-10">
      Ptposplus backend POD
    </h4>
    <p class="mb-20">
      <strong class="text-lg text-primary">{{ targetPod.metadata.name }}</strong>
    </p>

    <button @click="execInPod" :disabled="!targetPod" class="bg-blue-500 text-white p-2 rounded">
      Ver archivos logs
    </button>
    
    <h4 class="mt-20 mb-10">Archivos de logs:</h4>
    <div class="well"> 
        <ul class="overflow-auto" :class="{'text-error': execResult && execResult.stderr}">
            <template v-if="execResult && execResult.stdout">
                <li v-for="f in execResult.stdout.trim().split('\n')" :key="f" class="font-mono text-sm">
                    {{ f }}
                </li>
            </template>
            <template v-else-if="execResult && execResult.stderr">
                <li class="font-mono text-sm text-error">
                    Error: {{ execResult.stderr }}
                </li>
            </template>
            <template v-else>
                <li class="font-italic text-muted">Haga clic en el botón para cargar los logs.</li>
            </template>
        </ul> 
    </div>
    
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue"
import { useStore } from "vuex"
//import { useRoute } from "vue-router"


export default {
  name: "DashboardPage",
  props: {
   route: {
    type: Object,
    required: false
   }
  },
  setup(props) {
    const store = useStore()
    //const route = useRoute()

    const pods = ref([])
    const execResult = ref(null)

    const rancherUrl = computed(() => {
        const link = store.getters["rancherLink"]
        return link?.split('/c/')[0] || ""
    })

    const token = computed(() => {
        const header = store.getters["auth/fromHeader"]
        return header?.replace("Bearer ", "") || ""
    })


    const clusterId = computed(() => props.route?.params?.cluster || "N/DD")

    const targetPod = computed(() => {
      const prefix = "chart-apiagreement-webapp"
      return pods.value.find(p => p.metadata.name.startsWith(prefix))
    })

    const targetPodId = computed(() => {
      const prefix = "chart-apiagreement-webapp"
      const foundPod = pods.value.find(p => p.metadata.name.startsWith(prefix))
      return foundPod?.id || null
    })

    async function getRancherToken() {
        const res = await fetch('/v3/token', {
            method: 'POST',
            credentials: 'same-origin', // MUY IMPORTANTE
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify({
            type: 'token',
            description: 'extension-session'
            })
        });

        if (!res.ok) {
            const txt = await res.text();
            console.error('ERROR TOKEN:', txt);
            throw new Error('No se pudo crear token');
        }

        const data = await res.json();
        return data.token;
        }


    const execInPod = async () => {
      if (!targetPod.value) return

      const namespace = targetPod.value.metadata.namespace
      const pod = targetPod.value.metadata.name
      const command = "ls"
      const token="";

      console.log("token", token);

      const wsUrl = `http://192.168.195.126:31009/cluster/logs/${pod}/logs`

        const response = await fetch(wsUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.statusText}`)
        }

        const data = await response.text()
        let cleanedData = data;

        if (cleanedData.startsWith('"') && cleanedData.endsWith('"')) {
            cleanedData = cleanedData.substring(1, cleanedData.length - 1);
        }            
        
        const resultObject = JSON.parse(cleanedData); 
    
        let logContent = resultObject.stdout;
        logContent = logContent.replace(/(\.txt)(?=\S)/g, '$1\n');
        logContent = logContent.replace(/^(configuration-log\d{8}\.txt)(?=\S)/gm, '$1\n');
        resultObject.stdout = logContent;
        execResult.value = resultObject;      

    }

    onMounted(async () => {
      const lpods = await store.dispatch("cluster/findAll", {
        type: "pod",
        namespaced: true,
        namespace: "ptposplusnamespace",
      })

      pods.value = lpods

      console.log("TOKEN:", token.value)
      console.log("RANCHER URL:", rancherUrl.value)

      console.log("GETTERS DISPONIBLES:", Object.keys(store.getters))
      console.log("STATE AUTH:", store.state.auth)
    })

    return {
      pods,
      execResult,
      rancherUrl,
      token,
      clusterId,
      targetPod,
      targetPodId,
      execInPod,
    }
  },
}
</script>
