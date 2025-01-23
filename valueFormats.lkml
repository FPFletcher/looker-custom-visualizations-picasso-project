named_value_format: format_numbers {
  value_format: "[<1000]#,##0;[<1000000]#,##0.0,\"K\";#,##0.0,,\"M\""
}

named_value_format: format_large_numbers {
  value_format: "[<1000000]#,##0.0,\"K\";[<1000000000]#,##0.0,,\"M\";#,##0.0,,,\"B\""
}

named_value_format: format_small_numbers {
  value_format: "[<0.1]\"< \"0.0;[<1000]#,##0.0;[<1000000]#,##0.0,\"K\""
}

named_value_format: format_per {
  value_format: "[<0.01]0.00%;0.0%"
}

named_value_format: format_currency {
  value_format: "[<1000]\" \"0.0;[<1000000]\" \"0.0,\"K\";\" \"0.0,,\"M\""
}

named_value_format: format_eur {
  value_format: "[<1000]\"€ \"0.0;[<1000000]\"€ \"0.0,\"K\";\"€ \"0.0,,\"M\""
}

named_value_format: format_usd {
  value_format: "[<1000]\"$ \"0.0;[<1000000]\"$ \"0.0,\"K\";\"$ \"0.0,,\"M\""
}
