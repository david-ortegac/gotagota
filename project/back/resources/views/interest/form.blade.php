<div class="box box-info padding-1">
    <div class="box-body">
        
        <div class="form-group">
            {{ Form::label('interest') }}
            {{ Form::text('interest', $interest->interest, ['class' => 'form-control' . ($errors->has('interest') ? ' is-invalid' : ''), 'placeholder' => 'Interest']) }}
            {!! $errors->first('interest', '<div class="invalid-feedback">:message</div>') !!}
        </div>
        <div class="form-group">
            {{ Form::label('state') }}
            {{ Form::text('state', $interest->state, ['class' => 'form-control' . ($errors->has('state') ? ' is-invalid' : ''), 'placeholder' => 'State']) }}
            {!! $errors->first('state', '<div class="invalid-feedback">:message</div>') !!}
        </div>
        <div class="form-group">
            {{ Form::label('created_by') }}
            {{ Form::text('created_by', $interest->created_by, ['class' => 'form-control' . ($errors->has('created_by') ? ' is-invalid' : ''), 'placeholder' => 'Created By']) }}
            {!! $errors->first('created_by', '<div class="invalid-feedback">:message</div>') !!}
        </div>
        <div class="form-group">
            {{ Form::label('modified_by') }}
            {{ Form::text('modified_by', $interest->modified_by, ['class' => 'form-control' . ($errors->has('modified_by') ? ' is-invalid' : ''), 'placeholder' => 'Modified By']) }}
            {!! $errors->first('modified_by', '<div class="invalid-feedback">:message</div>') !!}
        </div>

    </div>
    <div class="box-footer mt20">
        <button type="submit" class="btn btn-primary">{{ __('Submit') }}</button>
    </div>
</div>