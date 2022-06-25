variable "cloudflare_email" {
  type        = string
  description = "Cloudflare email address"
  sensitive   = true

}

variable "cloudflare_api_token" {
  type        = string
  description = "Cloudflare API token"
  sensitive   = true

}
