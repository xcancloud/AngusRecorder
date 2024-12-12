<template>
  <div class="container">
    <div class="header">
      <h1>Request Recorder</h1>
      <div class="controls">
        <button @click="startRecording" :disabled="isRecording">Start Recording</button>
        <button @click="stopRecording" :disabled="!isRecording">Stop Recording</button>
        <button @click="saveSelected" :disabled="!selectedRequests.length">Save Selected</button>
      </div>
    </div>
    <div class="content">
      <div class="request-list">
        <div class="filters">
          <select v-model="currentFilter">
            <option value="all">All Requests</option>
            <option value="xhr">XHR</option>
            <option value="stylesheet">CSS</option>
            <option value="script">JS</option>
            <option value="document">HTML</option>
            <option value="other">Other</option>
          </select>
          <input v-model="searchQuery" placeholder="Search requests...">
        </div>
        <div class="requests">
          <div v-for="request in filteredRequests" :key="request.id" class="request-item">
            <input type="checkbox" v-model="request.selected">
            <span @click="selectRequest(request)">{{ request.url }}</span>
          </div>
        </div>
      </div>
      <div class="request-details" v-if="selectedRequest">
        <h2>Request Details</h2>
        <pre>{{ JSON.stringify(selectedRequest, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import {computed, ref} from 'vue'
import axios from 'axios'

export default {
  setup() {
    const isRecording = ref(false)
    const requests = ref([])
    const selectedRequest = ref(null)
    const currentFilter = ref('all')
    const searchQuery = ref('')

    const filteredRequests = computed(() => {
      return requests.value
          .filter(request => {
            if (currentFilter.value === 'all') return true
            if (currentFilter.value === 'other') {
              return !['xhr', 'stylesheet', 'script', 'document'].includes(request.type)
            }
            return request.type === currentFilter.value
          })
          .filter(request => request.url.toLowerCase().includes(searchQuery.value.toLowerCase()))
    })

    const selectedRequests = computed(() => {
      return requests.value.filter(request => request.selected)
    })

    const startRecording = () => {
      chrome.runtime.sendMessage({ action: 'startRecording' }, (response) => {
        if (response.status === 'started') {
          isRecording.value = true
          requests.value = []
        }
      })
    }

    const stopRecording = () => {
      chrome.runtime.sendMessage({ action: 'stopRecording' }, (response) => {
        if (response.status === 'stopped') {
          isRecording.value = false
          requests.value = response.requests
        }
      })
    }

    const selectRequest = (request) => {
      selectedRequest.value = request
    }

    const saveSelected = () => {
      const selectedData = selectedRequests.value.map(request => ({
        url: request.url,
        method: request.method,
        requestBody: request.requestBody,
        responseHeaders: request.responseHeaders,
        status: request.status
      }))

      axios.post('https://your-api-endpoint.com/save-requests', selectedData)
          .then(response => {
            alert('Requests saved successfully')
          })
          .catch(error => {
            alert('Error saving requests')
          })
    }

    return {
      isRecording,
      requests,
      selectedRequest,
      currentFilter,
      searchQuery,
      filteredRequests,
      selectedRequests,
      startRecording,
      stopRecording,
      selectRequest,
      saveSelected
    }
  }
}
</script>

<style scoped>
.container {
  width: 800px;
  height: 600px;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f0f0f0;
}

.controls {
  display: flex;
  gap: 10px;
}

.content {
  display: flex;
  flex: 1;
}

.request-list {
  width: 300px;
  border-right: 1px solid #ccc;
  display: flex;
  flex-direction: column;
}

.filters {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.requests {
  flex: 1;
  overflow-y: auto;
}

.request-item {
  padding: 5px;
  cursor: pointer;
}

.request-item:hover {
  background-color: #f0f0f0;
}

.request-details {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
}
</style>
