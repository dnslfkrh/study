terraform plan

Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # ncloud_server.demo will be created
  + resource "ncloud_server" "demo" {
      + base_block_storage_disk_detail_type = (known after apply)
      + base_block_storage_disk_type        = (known after apply)
      + base_block_storage_size             = (known after apply)
      + cpu_count                           = (known after apply)
      + id                                  = (known after apply)
      + instance_no                         = (known after apply)
      + instance_operation                  = (known after apply)
      + instance_status                     = (known after apply)
      + instance_status_name                = (known after apply)
      + internet_line_type                  = (known after apply)
      + is_fee_charging_monitoring          = (known after apply)
      + login_key_name                      = "<your_login_key_name>"
      + memory_size                         = (known after apply)
      + name                                = "terraform-demo"
      + platform_type                       = (known after apply)
      + port_forwarding_external_port       = (known after apply)
      + port_forwarding_internal_port       = (known after apply)
      + port_forwarding_public_ip           = (known after apply)
      + private_ip                          = (known after apply)
      + public_ip                           = (known after apply)
      + region                              = (known after apply)
      + server_image_name                   = (known after apply)
      + server_image_product_code           = "SW.VSVR.OS.LNX64.UBUNTU.2004.B050"
      + server_product_code                 = "SPSVRSSD00000003"
      + zone                                = (known after apply)
    }

Plan: 1 to add, 0 to change, 0 to destroy.

Changes to Outputs:
  + server_id   = (known after apply)
  + server_name = "terraform-demo"

─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── 

Note: You didn't use the -out option to save this plan, so Terraform can't guarantee to take exactly these actions if you run "terraform apply" now.