
## UTILITIES #####################
source('/Users/JoelSilver/PROJECTS/CODING/R/functions/utility-functions.R')
##################################

## LIBRARIES #####################
libs <- c(
  'dplyr',
  'jsonlite',
  'here'
)
load.libraries(libs)
##################################

## GET DATA ######################
dir.root <- dirname(rstudioapi::getActiveDocumentContext()$path)
f.json <- paste(dirname(dir.root), "json", sep = "/")
f.csv <- paste(dirname(dir.root), "csv", sep = "/")
csvs <- list.files(f.csv, pattern = ".csv")

for(item in csvs) {
  n <- sub('\\.csv$', '', item)
  assign(n, read.csv(paste(f.csv, item, sep = "/"), stringsAsFactors = FALSE))
}
###################################

## EXPLORE ########################

###################################