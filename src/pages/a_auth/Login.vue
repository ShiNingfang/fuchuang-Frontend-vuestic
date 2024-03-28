<template>
  <VaForm ref="form" @submit.prevent="submit">
    <h1 class="mb-4 text-4xl font-semibold">登录</h1>
    <p class="mb-4 text-base leading-5">
      没有账号？
      <RouterLink :to="{ name: 'signup' }" class="font-semibold text-primary">注册</RouterLink>
    </p>
    <VaInput v-model="formData.name" :rules="[validators.required]" class="mb-4" label="用户名" type="text" />
    <VaValue v-slot="isPasswordVisible" :default-value="false">
      <VaInput
        v-model="formData.password"
        :rules="[validators.required]"
        :type="isPasswordVisible.value ? 'text' : 'password'"
        class="mb-4"
        label="密码"
        @clickAppendInner.stop="isPasswordVisible.value = !isPasswordVisible.value"
      >
        <template #appendInner>
          <VaIcon
            :name="isPasswordVisible.value ? 'mso-visibility_off' : 'mso-visibility'"
            class="cursor-pointer"
            color="secondary"
          />
        </template>
      </VaInput>
    </VaValue>

    <div class="flex flex-col items-start justify-between auth-layout__options sm:flex-row sm:items-center">
      <VaCheckbox v-model="formData.keepLoggedIn" class="mb-2 sm:mb-0" label="下次自动登录" />
      <RouterLink :to="{ name: 'recover-password' }" class="mt-2 font-semibold sm:mt-0 sm:ml-1 text-primary">
        忘记密码？
      </RouterLink>
    </div>

    <div class="flex justify-center mt-4">
      <VaButton class="w-full" @click="submit"> 登录</VaButton>
    </div>
  </VaForm>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useForm, useToast } from 'vuestic-ui'
import { validators } from '../../services/utils'
import { Login } from '../../api/auth'

const { validate } = useForm('form')
const { push } = useRouter()
const { init } = useToast()

const formData = reactive({
  name: '',
  password: '',
  keepLoggedIn: false,
})

const submit = async () => {
  if (validate()) {
    const loginInfo = await Login({
      name: formData.name,
      password: formData.password,
    })
    console.log(loginInfo)
    init({ message: '你已经成功登录', color: 'success' })
    push({ name: 'dashboard' })
  }
}
</script>
