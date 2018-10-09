module ApplicationHelper


  def class_name_for_tenant_form(tenant)
    return "cc_form" if tenant.payment.blank?
    ""
  end
end
