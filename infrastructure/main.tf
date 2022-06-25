terraform {
  backend "s3" {
    bucket  = "crgeary-alpha-terraform-state"
    key     = "alpha.tfstate"
    region  = "eu-west-2"
    encrypt = true
    # dynamodb_table = ""
  }
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "3.17.0"
    }
    aws = {
      source  = "hashicorp/aws"
      version = "4.20.1"
    }
  }
}

provider "cloudflare" {
  email   = var.cloudflare_email
  api_key = var.cloudflare_api_token
}

provider "aws" {
  region = "eu-west-2"
}
