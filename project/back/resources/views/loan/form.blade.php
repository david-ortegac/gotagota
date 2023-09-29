<div class="box box-info padding-1">
    <div class="box-body">
        
        <div class="form-group">
            {{ Form::label('client_id') }}
            {{ Form::text('client_id', $loan->client_id, ['class' => 'form-control' . ($errors->has('client_id') ? ' is-invalid' : ''), 'placeholder' => 'Client Id']) }}
            {!! $errors->first('client_id', '<div class="invalid-feedback">:message</div>') !!}
        </div>
        <div class="form-group">
            {{ Form::label('amount') }}
            {{ Form::text('amount', $loan->amount, ['class' => 'form-control' . ($errors->has('amount') ? ' is-invalid' : ''), 'placeholder' => 'Amount']) }}
            {!! $errors->first('amount', '<div class="invalid-feedback">:message</div>') !!}
        </div>
        <div class="form-group">
            {{ Form::label('type') }}
            {{ Form::text('type', $loan->type, ['class' => 'form-control' . ($errors->has('type') ? ' is-invalid' : ''), 'placeholder' => 'Type']) }}
            {!! $errors->first('type', '<div class="invalid-feedback">:message</div>') !!}
        </div>
        <div class="form-group">
            {{ Form::label('remainingAmount') }}
            {{ Form::text('remainingAmount', $loan->remainingAmount, ['class' => 'form-control' . ($errors->has('remainingAmount') ? ' is-invalid' : ''), 'placeholder' => 'Remainingamount']) }}
            {!! $errors->first('remainingAmount', '<div class="invalid-feedback">:message</div>') !!}
        </div>
        <div class="form-group">
            {{ Form::label('remainingTime') }}
            {{ Form::text('remainingTime', $loan->remainingTime, ['class' => 'form-control' . ($errors->has('remainingTime') ? ' is-invalid' : ''), 'placeholder' => 'Remainingtime']) }}
            {!! $errors->first('remainingTime', '<div class="invalid-feedback">:message</div>') !!}
        </div>
        <div class="form-group">
            {{ Form::label('daysPastDue') }}
            {{ Form::text('daysPastDue', $loan->daysPastDue, ['class' => 'form-control' . ($errors->has('daysPastDue') ? ' is-invalid' : ''), 'placeholder' => 'Dayspastdue']) }}
            {!! $errors->first('daysPastDue', '<div class="invalid-feedback">:message</div>') !!}
        </div>
        <div class="form-group">
            {{ Form::label('created_by') }}
            {{ Form::text('created_by', $loan->created_by, ['class' => 'form-control' . ($errors->has('created_by') ? ' is-invalid' : ''), 'placeholder' => 'Created By']) }}
            {!! $errors->first('created_by', '<div class="invalid-feedback">:message</div>') !!}
        </div>
        <div class="form-group">
            {{ Form::label('modified_by') }}
            {{ Form::text('modified_by', $loan->modified_by, ['class' => 'form-control' . ($errors->has('modified_by') ? ' is-invalid' : ''), 'placeholder' => 'Modified By']) }}
            {!! $errors->first('modified_by', '<div class="invalid-feedback">:message</div>') !!}
        </div>

    </div>
    <div class="box-footer mt20">
        <button type="submit" class="btn btn-primary">{{ __('Submit') }}</button>
    </div>
</div>