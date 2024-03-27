<template>
  <VaForm ref="form" @submit.prevent="submit">
    <h1 class="mb-4 text-4xl font-semibold">注册</h1>
    <p class="mb-4 text-base leading-5">
      已有账户？
      <RouterLink :to="{ name: 'login' }" class="font-semibold text-primary">登录</RouterLink>
    </p>
    <!-- , (v) => /.+@.+\..+/.test(v) || 'Email should be valid' -->
    <VaInput
      v-model="formData.name"
      :rules="[(v) => !!v || '用户名是必填项']"
      class="mb-4"
      label="用户名"
      type="text"
    />
    <VaValue v-slot="isPasswordVisible" :default-value="false">
      <VaInput
        ref="password1"
        v-model="formData.password"
        :rules="passwordRules"
        :type="isPasswordVisible.value ? 'text' : 'password'"
        class="mb-4"
        label="密码"
        messages="密码需要8位以上的: 字符, 数字, 和特殊符号。"
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
      <VaInput
        ref="password2"
        v-model="formData.repeatPassword"
        :rules="[(v) => !!v || '确认密码是必填项', (v) => v === formData.password || '密码不一致']"
        :type="isPasswordVisible.value ? 'text' : 'password'"
        class="mb-4"
        label="确认密码"
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

    <div class="flex justify-center mt-4">
      <VaButton class="w-full" @click="submit"> 创建账户</VaButton>
    </div>
  </VaForm>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useForm, useToast } from 'vuestic-ui'
import { Register } from '../../api/auth'

const { validate } = useForm('form')
const { push } = useRouter()
const { init } = useToast()

const formData = reactive({
  name: '',
  password: '',
  repeatPassword: '',
})

const submit = async () => {
  if (validate()) {
    await Register({
      name: formData.name,
      password: formData.password,
    })
    init({
      message: '你已成功注册！',
      color: 'success',
    })
    push({ name: 'dashboard' })
  }
}

const passwordRules: ((v: string) => boolean | string)[] = [
  (v) => !!v || '密码域是必填项',
  (v) => (v && v.length >= 8) || '密码需要至少8位',
  (v) => (v && /[A-Za-z]/.test(v)) || '密码必须包含字母',
  (v) => (v && /\d/.test(v)) || '密码必须包含数字',
  (v) => (v && /[!@#$%^&*(),.?":{}|<>]/.test(v)) || '密码必须包含特殊字符',
]
</script>
