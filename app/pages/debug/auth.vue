<template>
  <v-container>
    <v-card>
      <v-card-title>Firebase Auth Debug Page</v-card-title>
      <v-card-subtitle>Testing Firebase Authentication</v-card-subtitle>

      <v-card-text>
        <v-alert v-if="!fireuser.loggedIn" type="warning" class="mb-4">
          You are not logged in
        </v-alert>

        <v-alert v-if="fireuser.loggedIn" type="success" class="mb-4">
          Successfully authenticated!
        </v-alert>

        <div class="auth-info mb-4">
          <h3 class="mb-3">Auth State:</h3>

          <v-simple-table dense>
            <tbody>
              <tr>
                <td><strong>Logged In:</strong></td>
                <td>{{ fireuser.loggedIn }}</td>
              </tr>
              <tr>
                <td><strong>UID:</strong></td>
                <td>{{ fireuser.uid || "N/A" }}</td>
              </tr>
              <tr>
                <td><strong>Display Name:</strong></td>
                <td>{{ fireuser.displayName || "N/A" }}</td>
              </tr>
              <tr>
                <td><strong>Email:</strong></td>
                <td>{{ fireuser.email || "N/A" }}</td>
              </tr>
              <tr>
                <td><strong>Email Verified:</strong></td>
                <td>{{ fireuser.emailVerified }}</td>
              </tr>
              <tr>
                <td><strong>Photo URL:</strong></td>
                <td class="text-truncate" style="max-width: 300px">
                  {{ fireuser.photoURL || "N/A" }}
                </td>
              </tr>
              <tr>
                <td><strong>Last Login:</strong></td>
                <td>{{ fireuser.lastLoginAt || "N/A" }}</td>
              </tr>
              <tr>
                <td><strong>Created At:</strong></td>
                <td>{{ fireuser.createdAt || "N/A" }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </div>

        <v-divider class="my-4" />

        <h3 class="mb-3">User Store State:</h3>
        <div class="store-info mb-4">
          <v-simple-table dense>
            <tbody>
              <tr>
                <td><strong>UID from Store:</strong></td>
                <td>{{ fireuser.uid || "N/A" }}</td>
              </tr>
              <tr>
                <td><strong>Store Initialized:</strong></td>
                <td>{{ userStore ? "Yes" : "No" }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </div>

        <v-divider class="my-4" />

        <div class="actions">
          <AuthButtons v-if="!fireuser.loggedIn" />

          <v-btn
            v-if="fireuser.loggedIn"
            color="error"
            class="mt-2"
            @click="handleLogout"
          >
            Logout
          </v-btn>
        </div>

        <v-divider class="my-4" />

        <h3 class="mb-3">Raw fireuser Object:</h3>
        <pre class="debug-json">{{ JSON.stringify(fireuser, null, 2) }}</pre>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { fireuser } from "@/plugins/firebase.client";
import { useUserStore } from "@/stores/user";
import { getAuth, signOut } from "firebase/auth";

const userStore = useUserStore();

const handleLogout = async () => {
  try {
    const auth = getAuth();
    await signOut(auth);
  } catch (error) {
    console.error("Logout error:", error);
  }
};
</script>

<style scoped>
.auth-info,
.store-info {
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

.debug-json {
  max-height: 400px;
  overflow-y: auto;
  padding: 16px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  font-size: 12px;
}
</style>
