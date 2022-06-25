data "cloudflare_zone" "crgeary_dev" {
  name = "crgeary.dev"
}

resource "cloudflare_record" "alpha_crgeary_dev" {
  zone_id = data.cloudflare_zone.crgeary_dev.id
  name    = "alpha"
  value   = "alpha-crgeary-dev.netlify.app" # Temporary
  type    = "CNAME"
  ttl     = 1
  proxied = "true"
}
