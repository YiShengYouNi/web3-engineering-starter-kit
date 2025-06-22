// apps/web/lib/polyfills.ts

// ⛑ Buffer polyfill
import { Buffer } from 'buffer'
if (typeof window !== 'undefined' && !window.Buffer) {
  window.Buffer = Buffer
}

// ⛑ process polyfill
import process from 'process'
if (typeof window !== 'undefined' && !window.process) {
  window.process = process
}

// 可以按需加入更多 polyfill，例如 crypto、stream
