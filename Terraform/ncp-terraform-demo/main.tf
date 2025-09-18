terraform {
  required_providers {
    ncloud = {
      source = "NaverCloudPlatform/ncloud"
      version = "~> 1.0"
    }
  }

  required_version = ">= 1.5.0"
}

provider "ncloud" {
  access_key = var.ncloud_access_key
  secret_key = var.ncloud_secret_key
  region = "KR"
}

resource "ncloud_server" "demo" {
  name = "terraform-demo"
  server_image_product_code = "SW.VSVR.OS.LNX64.UBUNTU.2004.B050"
  server_product_code = "SPSVRSSD00000003"
  login_key_name = var.login_key_name
}