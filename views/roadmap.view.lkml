view: roadmap {
  derived_table: {
    sql: SELECT * FROM UNNEST ([
      STRUCT("projet" AS use_case_name,
        "MVP" AS status,
        DATE "2024-04-04" AS start_date,
        DATE "2024-05-04" AS poc_date,
        DATE "2024-06-04" AS mvp_date,
        DATE "2024-07-04" AS deploy_date
        )]) ;;
  }
  dimension: use_case_name {
    type: string
    sql:  ${TABLE}.use_case_name ;;
    html:
    {% if use_case_name._value <> "MVP"  %}
    <div style="
      position: absolute;
      color: black;
      background-color: orange;
      padding: 0px !important;
      margin: 0px;
      border-left: 4mm ridge orange;">{{ rendered_value }}</div>
    {% else %}
    <p style= "padding: 0px; border: 0px; margin: 0px">{{ rendered_value }}</p>
    {% endif %};;
  }

  dimension: name_boolean {
    type: number
    sql: CASE WHEN  ${TABLE}.use_case_name = "MVP" THEN 1 ELSE 0 END;;
  }

  dimension: status {
    type: string
    sql:  ${TABLE}.status ;;
  }
  dimension: start_date {
    type: date
    sql:  ${TABLE}.start_date ;;
  }
  dimension: poc_date {
    type: date
    sql:  ${TABLE}.poc_date ;;
  }
  dimension: mvp_date {
    type: date
    sql:  ${TABLE}.mvp_date ;;
  }
  dimension: deploy_date {
    type: date
    sql:  ${TABLE}.deploy_date ;;
  }
}
