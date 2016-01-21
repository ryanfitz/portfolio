provider "aws" {
  access_key  = "${var.access_key}"
  secret_key  = "${var.secret_key}"
  region      = "${var.region}"
}

resource "aws_s3_bucket" "bucket" {
  bucket = "portfolio.ryanfitz.co"
  acl = "public-read"

  website {
    index_document = "index.html"
    error_document = "error404.html"
  }
}

output "website_endpoint" {
  value = "${aws_s3_bucket.bucket.website_endpoint}"
}