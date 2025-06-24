


export function showError(message: string) {
  // 这里可以使用任何UI库的toast组件
  // 例如：Toast.error(message)
  console.error(`Error: ${message}`)
}

export function showSuccess(message: string) {
  // 这里可以使用任何UI库的toast组件
  // 例如：Toast.success(message)
  console.log(`Success: ${message}`)
}