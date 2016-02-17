'use strict';

var profile = {
    add: function(parent_form){
        var farm_address = [];
        var data_values = {
                  "_token" : parent_form.find('input[name=_token]').val()
        };

        farm_address.push({});
        $(parent_form).find('.add-farm').map(function () {
            var details = {
                'name': $(this).find('input[name="farmAddress[][name]"]').val(),
                'addressLine1': $(this).find('input[name="farmAddress[][addressLine1]"]').val(),
                'addressLine2': $(this).find('input[name="farmAddress[][addressLine2]"]').val(),
                'province': $(this).find('input[name="farmAddress[][province]"]').val(),
                'zipCode': $(this).find('input[name="farmAddress[][zipCode]"]').val(),
                'farmType': $(this).find('input[name="farmAddress[][farmType]"]').val(),
                'landline': $(this).find('input[name="farmAddress[][landline]"]').val(),
                'mobile': $(this).find('input[name="farmAddress[][mobile]"]').val()
            };
            farm_address.push(details);
        });

        data_values["farmAddress"] = farm_address;

        // Do AJAX
        $.ajax({
            url: parent_form.attr('action'),
            type: "POST",
            cache: false,
            data: data_values,
            success: function(data){
                var data = JSON.parse(data);
                Materialize.toast('Profile updated Success!', 1500, 'green lighten-1');
                setTimeout(function(){ location.reload(); }, 1500);
            },
            error: function(message){
                console.log(message['responseText']);
            }
        });
    },
    edit: function(parent_form, edit_button, cancel_button){

        //$('#progress').fadeIn();
        $('.preloader-overlay').show();
        $.when(parent_form.find('input').prop('disabled',false)).done(function(){
            // Edit tooltip animation to Done
            edit_button.attr('data-tooltip','Done');
            edit_button.attr('data-position','top');
            edit_button.html('<i class="material-icons">done</i>');
            $(".tooltipped").tooltip({delay:50});
            edit_button.prop('disabled', false);
            cancel_button.toggle();
            // $('#progress').fadeOut();
            $('.preloader-overlay').hide();
        });

    },
    update: function(parent_form, edit_button, cancel_button){
        var data_values;

        // Determine if form is of personal or farm information
        if(parent_form.attr('personal-id')){
            data_values = {
                "id": parent_form.attr('personal-id'),
                "officeAddress_addressLine1": parent_form.find('input[name=officeAddress_addressLine1]').val(),
                "officeAddress_addressLine2": parent_form.find('input[name=officeAddress_addressLine2]').val(),
                "officeAddress_province": parent_form.find('input[name=officeAddress_province]').val(),
                "officeAddress_zipCode": parent_form.find('input[name=officeAddress_zipCode]').val(),
                "office_landline": parent_form.find('input[name=office_landline]').val(),
                "office_mobile": parent_form.find('input[name=office_mobile]').val(),
                "contactPerson_name": parent_form.find('input[name=contactPerson_name]').val(),
                "contactPerson_mobile": parent_form.find('input[name=contactPerson_mobile]').val(),
                "website": parent_form.find('input[name=website]').val(),
                "produce": parent_form.find('input[name=produce]').val(),
                "_token": parent_form.find('input[name=_token]').val()
            };
        }
        else if (parent_form.attr('farm-id')) {
            var farm_address = [];
            var details = {
                "name": parent_form.find('input[name=name]').val(),
                "addressLine1": parent_form.find('input[name=addressLine1]').val(),
                "addressLine2": parent_form.find('input[name=addressLine2]').val(),
                "province": parent_form.find('input[name=province]').val(),
                "zipCode": parent_form.find('input[name=zipCode]').val(),
                "farmType": parent_form.find('input[name=farmType]').val(),
                "landline": parent_form.find('input[name=landline]').val(),
                "mobile": parent_form.find('input[name=mobile]').val(),
            };
            farm_address.push({});
            farm_address.push(details);

            data_values = {
                    "id": parent_form.attr('farm-id'),
                "_token": parent_form.find('input[name=_token]').val()
            };
            data_values["farmAddress"] = farm_address;
        }

        // Do AJAX
        $.ajax({
            url: parent_form.attr('action'),
            type: "PUT",
            cache: false,
            data: data_values,
            success: function(data){
                var data = JSON.parse(data);
                $('#progress').fadeIn();
                parent_form.find('input').prop('disabled',true);

                // Change the values of the input
                if(parent_form.attr('personal-id')){
                    parent_form.find('input[name=officeAddress_addressLine1]').val(data.officeAddress_addressLine1);
                    parent_form.find('input[name=officeAddress_addressLine2]').val(data.officeAddress_addressLine2);
                    parent_form.find('input[name=officeAddress_province]').val(data.officeAddress_province);
                    parent_form.find('input[name=officeAddress_zipCode]').val(data.officeAddress_zipCode);
                    parent_form.find('input[name=office_landline]').val(data.office_landline);
                    parent_form.find('input[name=office_mobile]').val(data.office_mobile);
                    parent_form.find('input[name=contactPerson_name]').val(data.contactPerson_name);
                    parent_form.find('input[name=contactPerson_mobile]').val(data.contactPerson_mobile);
                    parent_form.find('input[name=website]').val(data.website);
                    parent_form.find('input[name=produce]').val(data.produce);

                }
                else if(parent_form.attr('farm-id')){
                    parent_form.find('input[name=name]').val(data.name);
                    parent_form.find('.farm-title').html(data.name);
                    parent_form.find('input[name=addressLine1]').val(data.addressLine1);
                    parent_form.find('input[name=addressLine2]').val(data.addressLine2);
                    parent_form.find('input[name=province]').val(data.province);
                    parent_form.find('input[name=zipCode]').val(data.zipCode);
                    parent_form.find('input[name=farmType]').val(data.farmType);
                    parent_form.find('input[name=landline]').val(data.landline);
                    parent_form.find('input[name=mobile]').val(data.mobile);
                }

                // Done tooltip animation to Edit
                edit_button.attr('data-tooltip','Edit');
                edit_button.attr('data-position','left');
                edit_button.html('<i class="material-icons">mode_edit</i>');
                $(".tooltipped").tooltip({delay:50});
                edit_button.prop('disabled', false);
                cancel_button.toggle();
                $('#progress').fadeOut();
                Materialize.toast('Profile updated successfully!', 2000, 'green lighten-1');
            },
            error: function(message){
                console.log(message['responseText']);
            }
        });
    },
    cancel: function(parent_form, edit_button, cancel_button){
        $('#progress').fadeIn();
        cancel_button.tooltip('remove');
        $.when(parent_form.find('input').prop('disabled',true)).done(function(){
            // Done tooltip animation to Edit
            edit_button.attr('data-tooltip','Edit');
            edit_button.attr('data-position','left');
            edit_button.html('<i class="material-icons">mode_edit</i>');
            $(".tooltipped").tooltip({delay:50});
            cancel_button.toggle();
            $('#progress').fadeOut();
        });
    },
    remove: function(parent_form, row){
        $.ajax({
            url: parent_form.attr('action'),
            type: "DELETE",
            cache: false,
            data: {
                "id": parent_form.attr('farm-id'),
                "_token": parent_form.find('input[name=_token]').val()
            },
            success: function(data){
                $('#progress').fadeIn();

                if(data == 'OK') {
                    row.remove();
                    Materialize.toast('Farm information removed',2000);
                }
                else Materialize.toast('Farm information removal unsuccessful', 3500, 'red');

                $('#progress').fadeOut();
            },
            error: function(message){
                console.log(message['responseText']);
            }
        });
    },
    get: function(parent_form,name){
        return $(parent_form).find('input[name="farmAddress[]['+name+']"]').map(function () {
            return $(this).val();
        });
    }

};