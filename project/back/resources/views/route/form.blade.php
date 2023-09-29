<div class="box box-info padding-1">
    <div class="box-body">
        
        <div class="form-group">
            {{ Form::label('sede_id') }}
            {{ Form::text('sede_id', $route->sede_id, ['class' => 'form-control' . ($errors->has('sede_id') ? ' is-invalid' : ''), 'placeholder' => 'Sede Id']) }}
            {!! $errors->first('sede_id', '<div class="invalid-feedback">:message</div>') !!}
        </div>
        <div class="form-group">
            {{ Form::label('number') }}
            {{ Form::text('number', $route->number, ['class' => 'form-control' . ($errors->has('number') ? ' is-invalid' : ''), 'placeholder' => 'Number']) }}
            {!! $errors->first('number', '<div class="invalid-feedback">:message</div>') !!}
        </div>
        <div class="form-group">
            {{ Form::label('created_by') }}
            {{ Form::text('created_by', $route->created_by, ['class' => 'form-control' . ($errors->has('created_by') ? ' is-invalid' : ''), 'placeholder' => 'Created By']) }}
            {!! $errors->first('created_by', '<div class="invalid-feedback">:message</div>') !!}
        </div>
        <div class="form-group">
            {{ Form::label('modified_by') }}
            {{ Form::text('modified_by', $route->modified_by, ['class' => 'form-control' . ($errors->has('modified_by') ? ' is-invalid' : ''), 'placeholder' => 'Modified By']) }}
            {!! $errors->first('modified_by', '<div class="invalid-feedback">:message</div>') !!}
        </div>

    </div>
    <div class="box-footer mt20">
        <button type="submit" class="btn btn-primary">{{ __('Submit') }}</button>
    </div>
</div>